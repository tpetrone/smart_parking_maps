module Mock
  class UsersController < ApplicationController
    def signup
      if params[:email] == "user@valid.com"
        render_json 'signup_success'
      else
        render_json 'signup_fail', :unauthorized
      end
    end

    def signin
      if params[:email] == "user@valid.com"
        render_json 'signin_success'
      else
        render_json 'signin_fail', :unauthorized
      end
    end

    def signout
      if params[:error] == "1"
        render_json 'signout_fail', :bad_request
      else
        render_json 'signout_success'
      end
    end

    def reset
      if params[:error] == "1"
        render_json 'reset_fail', :bad_request
      else
        render_json 'reset_success'
      end
    end

    def update
      if params[:error] == "1"
        render_json 'update_fail', :bad_request
      else
        render_json 'update_success'
      end
    end

    private

    def render_json(view_name, status_code = :ok)
      render(
        json: JSON.load(
          File.read("#{Rails.root}/app/views/mock/users/#{view_name}.json")),
        status: status_code
      )
    end
  end
end
