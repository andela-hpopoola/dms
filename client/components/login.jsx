import React, { Component } from 'react';


/**
 * @class Login
 * @desc Class to display the Login Page
 * @extends React.Component
 */
class Login extends Component {
  /**
   * @desc Displays the Login Page
   * @return {any} The Login form
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col s12">
            <div className="card-content">
              <span className="card-title">Login</span><br />
              <div className="row">
                <form className="col s12">

                  {/* Email */}
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="validate"
                        required="required"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="validate"
                        required="required"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="submit"
                  >
                    Submit
                  </button>

                  {/* Error Message */}
                  {/*{alert.error(this.props.errorMessage)}
                  {this.errorMessage = ''}*/}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Login;

