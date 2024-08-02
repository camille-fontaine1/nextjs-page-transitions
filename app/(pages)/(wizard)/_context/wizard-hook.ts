import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Action, WizardContext } from "./wizard-context";

const ANIMATION_DURATION = 400; //milliseconds
const TICK = 1; //milliseconds

/** Allows to navigate back and forth within a wizard with automatic page transition on each navigation. */
export function useWizardContext() {
  const wizardContext = useContext(WizardContext);
  const router = useRouter();

  if (!wizardContext) {
    throw new Error("WizardContext was not instantiated.");
  }

  const context = wizardContext;

  /** Navigate to the page provided, using the 'Next' animation. */
  function next(href: string) {
    navigate(Action.Next, href, context, router);
  }

  /** Navigate to the page provided, using the 'Back' animation. */
  function back(href: string) {
    navigate(Action.Back, href, context, router);
  }

  /** Starts the 'in' animation of the current page. */
  function ready() {
    if (context.isAnimationCompleted.current == null) {
      return;
    }

    // Starts the animation now if the 'out' animation has completed, or mark it as pending otherwise
    if (context.isAnimationCompleted.current === true) {
      setTimeout(() => {
        const animation = getInAnimation(context.action.current!);
        context.setAnimation(animation);
      }, TICK);
    } else {
      context.pendingReset.current = ready;
    }
  }

  return { next, back, ready };
}

// Private helper functions

/** Gets the CSS class required to animate the page transition before the navigation. */
function getOutAnimation(action: Action) {
  return action === Action.Back ? "animate-slide-right" : "animate-slide-left";
}

/** Gets the CSS class required to animate the page transition after the navigation. */
function getInAnimation(action: Action) {
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
  const animation = getOutAnimation(action);
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
