import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, getByText } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
];

describe('Snapshot', () => {
    test('App snapshot test', () => {
        const component = renderer.create(<App tasks={DATA} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
}
);

/* describe('dom changes', () => {
    test('addTask adds task to array', () => {
        const component = renderer.create(<App tasks={DATA} />);
        fireEvent.click(getByText('submit'));
        expect(tasks.length).toBe(4);
    });
}); */


describe('tutorial tests', () => {
    test('2 + 2 = 4', () => {
        expect(2 + 2).toBe(4);
    });

    test('match hello in string', () => {
        expect('hello world').toMatch('hello');
    });

    test('check that array contains original array', () => {
        const arrayOG = ['hello', 'world'];
        expect(['hello', 'world', 'avocado']).toEqual(expect.arrayContaining(arrayOG));
    })
});

