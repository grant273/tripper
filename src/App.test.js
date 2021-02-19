import React from 'react'
import { render, fireEvent, waitFor, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App';

afterEach(() => {
  global.localStorage.clear();
});

it('expands a bundle into its subitems when clicked', () => {
  render(<App/>);

  const allLists = screen.getAllByRole('list');
  expect(allLists).toHaveLength(3);
  const [thisTripList, neededList, unneededList] = allLists;

  const bufBtn = screen.getByText('Buffalo Dip');

  fireEvent.mouseDown(bufBtn);

  expect(within(unneededList).queryByText('Buffalo Dip')).toBeNull();
  expect(within(neededList).queryAllByText('Buffalo Dip')).toHaveLength(3);
});


it('collapses a bundle if all subItems are demoted to unneeded', () => {
  render(<App/>);

  const allLists = screen.getAllByRole('list');
  const [thisTripList, neededList, unneededList] = allLists;
  const bufBtn = screen.getByText('Buffalo Dip');
  fireEvent.mouseDown(bufBtn);

  const neededListItems = within(neededList).queryAllByRole('listitem');
  expect(neededListItems.length).toEqual(4);
  for (const neededListItem of neededListItems) {
    if (within(neededListItem).queryByText('Buffalo Dip')) {
      const itemCheckbox = within(neededListItem).getByRole('checkbox');
      fireEvent.click(itemCheckbox);
    }
  }

  expect(within(neededList).queryAllByText('Buffalo Dip')).toHaveLength(0);
  expect(within(unneededList).getByText('Buffalo Dip')).toBeDefined();



});
