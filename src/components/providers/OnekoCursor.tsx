"use client";

import { useEffect, useRef, useState } from "react";

const SPRITE_SETS = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
} as const;

type SpriteName = keyof typeof SPRITE_SETS;
type IdleAnimation = "sleeping" | "scratchWallN" | "scratchWallS" | "scratchWallE" | "scratchWallW" | "scratchSelf";

const NEKO_SPEED = 10;

export function OnekoCursor() {
  const [enabled, setEnabled] = useState(false);
  const nekoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const el = nekoRef.current;
    if (!el) return;

    const s = {
      nekoPosX: 32,
      nekoPosY: 32,
      mousePosX: 0,
      mousePosY: 0,
      frameCount: 0,
      idleTime: 0,
      idleAnimation: null as IdleAnimation | null,
      idleAnimationFrame: 0,
      lastFrameTimestamp: 0,
      rafId: 0,
    };

    const setSprite = (name: SpriteName, frame: number) => {
      const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
      el.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    };

    const resetIdleAnimation = () => {
      s.idleAnimation = null;
      s.idleAnimationFrame = 0;
    };

    const idle = () => {
      s.idleTime += 1;
      if (s.idleTime > 10 && Math.floor(Math.random() * 200) === 0 && s.idleAnimation == null) {
        const available: IdleAnimation[] = ["sleeping", "scratchSelf"];
        if (s.nekoPosX < 32) available.push("scratchWallW");
        if (s.nekoPosY < 32) available.push("scratchWallN");
        if (s.nekoPosX > window.innerWidth - 32) available.push("scratchWallE");
        if (s.nekoPosY > window.innerHeight - 32) available.push("scratchWallS");
        s.idleAnimation = available[Math.floor(Math.random() * available.length)];
      }

      switch (s.idleAnimation) {
        case "sleeping":
          if (s.idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(s.idleAnimationFrame / 4));
          if (s.idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(s.idleAnimation, s.idleAnimationFrame);
          if (s.idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      s.idleAnimationFrame += 1;
    };

    const frame = () => {
      s.frameCount += 1;
      const diffX = s.nekoPosX - s.mousePosX;
      const diffY = s.nekoPosY - s.mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < NEKO_SPEED || distance < 48) {
        idle();
        return;
      }

      s.idleAnimation = null;
      s.idleAnimationFrame = 0;

      if (s.idleTime > 1) {
        setSprite("alert", 0);
        s.idleTime = Math.min(s.idleTime, 7);
        s.idleTime -= 1;
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite((direction || "N") as SpriteName, s.frameCount);

      s.nekoPosX -= (diffX / distance) * NEKO_SPEED;
      s.nekoPosY -= (diffY / distance) * NEKO_SPEED;
      s.nekoPosX = Math.min(Math.max(16, s.nekoPosX), window.innerWidth - 16);
      s.nekoPosY = Math.min(Math.max(16, s.nekoPosY), window.innerHeight - 16);

      el.style.left = `${s.nekoPosX - 16}px`;
      el.style.top = `${s.nekoPosY - 16}px`;
    };

    const onMouseMove = (e: MouseEvent) => {
      s.mousePosX = e.clientX;
      s.mousePosY = e.clientY;
    };

    const onAnimationFrame = (timestamp: number) => {
      if (!el.isConnected) return;
      if (!s.lastFrameTimestamp) s.lastFrameTimestamp = timestamp;
      if (timestamp - s.lastFrameTimestamp > 100) {
        s.lastFrameTimestamp = timestamp;
        frame();
      }
      s.rafId = window.requestAnimationFrame(onAnimationFrame);
    };

    document.addEventListener("mousemove", onMouseMove);
    s.rafId = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.cancelAnimationFrame(s.rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={nekoRef}
      aria-hidden
      id="oneko"
      className="oneko-sprite pointer-events-none fixed z-[2147483647]"
      style={{
        width: 32,
        height: 32,
        left: 16,
        top: 16,
        backgroundImage:
          "url(/oneko/oneko.gif), url(https://cdn.jsdelivr.net/gh/adryd325/oneko.js@main/oneko.gif)",
        backgroundPosition: "-96px -96px",
      }}
    >
    </div>
  );
}
