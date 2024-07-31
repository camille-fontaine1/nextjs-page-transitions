import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Action, WizardContext } from "./wizard-context";

const ANIMATION_DURATION = 400; //milliseconds
const TICK = 1; //milliseconds

/** Allows to navigate back and forth within a wizard with automatic page transition on each navigation. */
export function useWizardContext() {
  const wizardContext = useContext(WizardContext);

  if (!wizardContext) {
    throw new Error("WizardContext was not instantiated.");
  }

  const router = useRouter();
  const context = wizardContext;

  /** Navigate to the page provided, using the 'Next' animation. */
  function next(href: string) {
    navigate(Action.Next, href, context, router);
  }

  /** Navigate to the page provided, using the 'Back' animation. */
  function back(href: string) {
    navigate(Action.Back, href, context, router);
  }

  /** Moves the content back to its original position. */
  function reset() {
    if (context.isAnimationCompleted.current == null) {
      return;
    }

    // Reset the position of the content if the start animation is completed, or mark it as pending otherwise
    if (context.isAnimationCompleted.current === true) {
      setTimeout(() => {
        const animation = getEndAnimationByAction(context.action.current!);
        context.setAnimation(animation);
      }, TICK);
    } else {
      context.pendingReset.current = reset;
    }
  }

  return { next, back, reset };
}

// Private helper functions

/** Gets the CSS class to use to animate the page transition before the navigation. */
function getStartAnimationByAction(action: Action) {
  return action === Action.Back ? "animate-slide-right" : "animate-slide-left";
}

/** Gets the CSS class to use to animate the page transition after the navigation. */
function getEndAnimationByAction(action: Action) {
  return action === Action.Next
    ? "animate-slide-right-reverse"
    : "animate-slide-left-reverse";
}

/** Navigates to the provided page, resetting the layout after the animation is completed. */
function navigate(
  action: Action,
  href: string,
  context: WizardContext,
  router: ReturnType<typeof useRouter>
) {
  router.prefetch(href, { kind: PrefetchKind.FULL });

  context.action.current = action;
  context.isAnimationCompleted.current = false;

  // Start the animation
  const animation = getStartAnimationByAction(action);
  context.setAnimation(animation);

  // Wait for the animation to be completed before navigating
  setTimeout(() => {
    context.isAnimationCompleted.current = true;
    router.push(href);
    if (context.pendingReset.current != undefined) {
      context.pendingReset.current();
      context.pendingReset.current = undefined;
    }
  }, ANIMATION_DURATION);
}
