class Api::UsersController < ApplicationController
    def create 
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            @votes = []
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private 
    # add avatar params when doing AWS
    def user_params
        params.require(:user).permit(:username, :password)
    end
end