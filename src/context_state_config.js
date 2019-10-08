import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as AuthReducer from './store/reducers/auth_reducer';
import * as FormReducer from './store/reducers/form_reducer';
import Routes from './routes';

import Auth from './utils/auth';

const auth = new Auth();

const ContextState = () => {
  // Auth Reducer
  const [stateAuth, dispatchAuth] =
    useReducer(AuthReducer.AuthReducer, AuthReducer.initialState);

  const handleLogin = () => {
    dispatchAuth(ACTIONS.login_success());
  }

  const handleLogout = () => {
    dispatchAuth(ACTIONS.login_failure());
  }

  const handleAddProfile = (profile) => {
    dispatchAuth(ACTIONS.add_profile(profile));
  }

  const handleRemoveProfile = () => {
    dispatchAuth(ACTIONS.remove_profile());
  }

  // Form Reducer
  const [stateForm, dispatchForm] =
    useReducer(FormReducer.FormReducer, FormReducer.initialState);

  const handleFormChange = (event) => {
    dispatchForm(ACTIONS.user_input_change(event.target.value));
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.persist();
    dispatchForm(ACTION.user_input_submit(event.target.useContext.value))
  }

  // Handle authentication from callback
  const handleAuthentication = (props) => {
    if(props.location.hash) {
      auth.handleAuth();
    }
  }

  return (
    <div>
      <Context.Provider
        value={{
          // Auth Reducer
          authState: stateAuth.is_authenticated,
          profileState: stateAuth.profile,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleUserAddProfile: (profile) => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          // Form Reducer
          useContextChangeState: stateForm.user_textChange,
          useContextSubmitState: stateForm.user_textSubmit,
          useContextChange: (event) => handleFormChange(event),
          useContextSubmit: (event) => handleFormSubmit(event),

          // Handle auth
          handleAuth: (props) => handleAuthentication(props),
          authObj: auth
        }}>
        <Routes />
      </Context.Provider>
    </div>
  )
}

export default ContextState;