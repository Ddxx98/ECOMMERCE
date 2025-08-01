import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
    it('should render', () => {
        expect(App).toBeTruthy();
    });
    it('should match snapshot', () => {
        expect(App).toMatchSnapshot();
    });
    it('should contain home text', () => {
        
    })
});
