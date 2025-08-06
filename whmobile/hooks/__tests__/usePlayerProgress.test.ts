import React from 'react';
import usePlayerProgress from '../usePlayerProgress';

describe('usePlayerProgress', () => {
  const setupMock = () => {
    const states: any[] = [];
    const useState = jest.fn(<T,>(initial: T): [T, (v: T) => void] => {
      const index = states.length;
      states.push(initial);
      const setState = (value: T) => {
        states[index] = value;
      };
      return [states[index], setState];
    });
    return { states, useState };
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('levels up with leftover XP and popup control', () => {
    const { states, useState } = setupMock();
    jest.spyOn(React, 'useState').mockImplementation(useState as any);

    const progress = usePlayerProgress();
    progress.addXP(150); // gain enough XP to level up once

    expect(states[0]).toBe(2); // level increases
    expect(states[1]).toBe(50); // leftover XP
    expect(states[3]).toBe(true); // popup shown

    progress.dismissPopup();
    expect(states[3]).toBe(false); // popup dismissed
  });

  test('levels up with exact XP and no leftover', () => {
    const { states, useState } = setupMock();
    jest.spyOn(React, 'useState').mockImplementation(useState as any);

    const progress = usePlayerProgress();
    progress.addXP(100); // exactly enough XP to level up

    expect(states[0]).toBe(2);
    expect(states[1]).toBe(0); // no leftover XP
    expect(states[3]).toBe(true);

    progress.dismissPopup();
    expect(states[3]).toBe(false);
  });

  test('handles multiple level ups in one call', () => {
    const { states, useState } = setupMock();
    jest.spyOn(React, 'useState').mockImplementation(useState as any);

    const progress = usePlayerProgress();
    progress.addXP(400); // should level up twice: 1->3

    expect(states[0]).toBe(3);
    expect(states[1]).toBe(150);
    expect(states[3]).toBe(true);
  });
});
