import expect from 'expect';
import * as ajaxStatus from '../../actions/ajaxStatusActions';
import * as types from './../../actions/actionTypes';


describe('AjaxStatus Actions', () => {
  describe('Ajax Call Start', () => {
    it('should signal the application that an ajax call is in progress', () => {
      const expected = {
        type: types.AJAX_CALL_START
      };

      const action = ajaxStatus.ajaxCallStart();
      expect(action).toEqual(expected);
    });
  });

  describe('Ajax Call End', () => {
    it('should signal the application that an ajax has ended', () => {
      const expected = {
        type: types.AJAX_CALL_END
      };

      const action = ajaxStatus.ajaxCallEnd();
      expect(action).toEqual(expected);
    });
  });
});
