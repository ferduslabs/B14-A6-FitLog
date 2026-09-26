'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

const PlanContext = createContext(null);

export const PLAN_LIMIT = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [toast, setToast] = useState(null);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const toastTimer = useRef(null);

  useEffect(function loadFromStorage() {
    try {
      const storedPlan = localStorage.getItem('fitlog_plan');
      const storedSaved = localStorage.getItem('fitlog_saved');
      const storedDone = localStorage.getItem('fitlog_done');
      if (storedPlan !== null) {
        const parsed = JSON.parse(storedPlan);
        if (Array.isArray(parsed)) setPlan(parsed);
      }
      if (storedSaved !== null) {
        const parsed = JSON.parse(storedSaved);
        if (Array.isArray(parsed)) setSaved(parsed);
      }
      if (storedDone !== null) {
        const parsed = JSON.parse(storedDone);
        if (Array.isArray(parsed)) setDone(parsed);
      }
    } catch (error) {
      setPlan([]);
      setSaved([]);
      setDone([]);
    }
    setStorageLoaded(true);
  }, []);

  useEffect(function persistPlan() {
    if (storageLoaded) {
      localStorage.setItem('fitlog_plan', JSON.stringify(plan));
    }
  }, [plan, storageLoaded]);

  useEffect(function persistSaved() {
    if (storageLoaded) {
      localStorage.setItem('fitlog_saved', JSON.stringify(saved));
    }
  }, [saved, storageLoaded]);

  useEffect(function persistDone() {
    if (storageLoaded) {
      localStorage.setItem('fitlog_done', JSON.stringify(done));
    }
  }, [done, storageLoaded]);

  function showToast(message, type) {
    const toastType = type || 'success';
    setToast({ message: message, type: toastType, id: Date.now() });
    if (toastTimer.current !== null) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(function () {
      setToast(null);
      toastTimer.current = null;
    }, 2500);
  }

  function isInPlan(workoutId) {
    return plan.indexOf(workoutId) !== -1;
  }

  function isInSaved(workoutId) {
    return saved.indexOf(workoutId) !== -1;
  }

  function addToPlan(workout) {
    if (isInPlan(workout.id)) {
      showToast('Already in your plan', 'error');
      return;
    }
    if (plan.length >= PLAN_LIMIT) {
      showToast("Today's plan is full — finish a lift first", 'error');
      return;
    }
    setPlan(function (prev) {
      if (prev.indexOf(workout.id) !== -1) return prev;
      return [...prev, workout.id];
    });
    showToast("Added to today's plan", 'success');
  }

  function removeFromPlan(workoutId) {
    setPlan(function (prev) {
      return prev.filter(function (id) {
        return id !== workoutId;
      });
    });
    setDone(function (prev) {
      return prev.filter(function (id) {
        return id !== workoutId;
      });
    });
    showToast('Removed from plan', 'success');
  }

  function markAsDone(workoutId) {
    setDone(function (prev) {
      if (prev.indexOf(workoutId) !== -1) return prev;
      return [...prev, workoutId];
    });
    showToast('Marked as done — nice work', 'success');
  }

  function addToSaved(workout) {
    if (isInSaved(workout.id)) {
      showToast('Already saved', 'error');
      return;
    }
    setSaved(function (prev) {
      if (prev.indexOf(workout.id) !== -1) return prev;
      return [...prev, workout.id];
    });
    showToast('Saved for later', 'success');
  }

  function removeFromSaved(workoutId) {
    setSaved(function (prev) {
      return prev.filter(function (id) {
        return id !== workoutId;
      });
    });
    showToast('Removed from saved', 'success');
  }

  const planValue = {
    plan: plan,
    saved: saved,
    done: done,
    toast: toast,
    addToPlan: addToPlan,
    removeFromPlan: removeFromPlan,
    markAsDone: markAsDone,
    addToSaved: addToSaved,
    removeFromSaved: removeFromSaved,
    isInPlan: isInPlan,
    isInSaved: isInSaved,
    showToast: showToast,
  };

  return <PlanContext.Provider value={planValue}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  return useContext(PlanContext);
}
