/* Scroll reveal, modelled on apple.com.
   - One calm rise per block: 20px + fade over 0.8s on Apple's own easing curve
     (0.28, 0.11, 0.32, 1). Items that sit side by side share a trigger, so a row
     rises together; nothing cascades card-by-card (no stagger delays anywhere).
   - Fires once, as a block's top crosses ~8% into the viewport, so it has settled
     before it reaches reading height and never replays on scroll back.
   - MotionConfig reducedMotion="user" (main.tsx) drops the movement for anyone
     who has asked their OS for less motion. */
export const EASE_APPLE = [0.28, 0.11, 0.32, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.8, ease: EASE_APPLE },
};

// Page-load entrance for above-the-fold content: one move, no choreography.
export const enter = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE_APPLE, delay: 0.05 },
};
