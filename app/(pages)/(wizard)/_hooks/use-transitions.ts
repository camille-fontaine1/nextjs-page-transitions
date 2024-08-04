"use client";

import { useContext } from "react";
import { Animation, TransitionContext } from "../_context/transition-context";

const ANIMATION_DURATION = 400; //milliseconds

/** Gives access to different transitions between pages. */
export function useTransitions() {
  const transitionContext = useContext(TransitionContext);

  if (!transitionContext) {
    throw new Error(
      "You are attempting to use useTransitions outside of a TransitionContext."
    );
  }

  const context = transitionContext;

  /** Triggers the 'Slide Left - Out' animation.
   * @returns A promise that resolves when the animation completes. */
  function slideLeft() {
    return animate("slide-left", context);
  }

  /** Triggers the 'Slide Right - Out' animation.
   * @returns A promise that resolves when the animation completes. */
  function slideRight() {
    return animate("slide-right", context);
  }

  /** Triggers the correct 'In' animation. */
  function slideIntoViewport() {
    if (context.animation.current) {
      const animation = getInAnimation(context.animation.current);
      context.setClassName(animation);
    }
  }

  return { slideLeft, slideRight, slideIntoViewport };
}

// Private helper functions

/** Gets the CSS class required to play the 'Out' animation. */
function getOutAnimation(animation: Animation) {
  return animation === "slide-left"
    ? "animate-slide-left-out"
    : "animate-slide-right-out";
}

/** Gets the CSS class required to play the 'IIn' animation. */
function getInAnimation(animation: Animation) {
  return animation === "slide-left"
    ? "animate-slide-left-in"
    : "animate-slide-right-in";
}

/** Triggers the animation. */
function animate(animation: Animation, context: TransitionContext) {
  return new Promise((resolve) => {
    // Start the animation
    const className = getOutAnimation(animation);
    context.setClassName(className);
    context.animation.current = animation;

    // Wait for the animation to be completed before resolving the promise
    setTimeout(resolve, ANIMATION_DURATION);
  });
}
