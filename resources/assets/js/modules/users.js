/*
 |-------------------------------------------------------------------------------
 | VUEX modules/users.js
 |-------------------------------------------------------------------------------
 | The Vuex data store for the users
 */

import UserAPI from '../api/user.js';
import {EventBus} from '../event-bus.js';

export const users = {
    /*
     Defines the state being monitored for the module.
     */
    state: {
        user: {},
        userLoadStatus: 0,
        userUpdateStatus: 0,
        bgValidations:{
            is_valid:false,
            text:''
        },
        bgRegisterValidations: {
            is_valid:false,
            text:''
        }
    },

    /*
     Defines the actions used to retrieve the data.
     */
    actions: {
        loadUser({commit}) {
            commit('setUserLoadStatus', 1);

            UserAPI.getUser()
                .then(function (response) {
                    commit('setUser', response.data);
                    commit('setUserLoadStatus', 2);
                })
                .catch(function () {
                    commit('setUser', {});
                    commit('setUserLoadStatus', 3);
                });
        },

        /*
         Edits a user
         */
        editUser({commit, state, dispatch}, data) {
            commit('setUserUpdateStatus', 1);

            UserAPI.putUpdateUser(data.public_visibility, data.favorite_coffee, data.flavor_notes, data.city, data.state)
                .then(function (response) {
                    commit('setUserUpdateStatus', 2);
                    dispatch('loadUser');
                })
                .catch(function () {
                    commit('setUserUpdateStatus', 3);
                });
        },

        login({commit,state, dispatch},data){
            UserAPI.login(data.email,data.password)
                .then(function(response) {
                    if(response.data.code != 200) {
                        commit('setBgValidations',{valid:true,text:response.data.msg});
                    }else {
                        EventBus.$emit('hidden-login');
                        //this.$router.push({path: '/cafes'});
                        dispatch('loadUser');
                    }
                })
                .catch(function () {
                    commit('setBgValidations',{valid:true,text:'服务异常'});
                })
        },

        register({commit,state, dispatch},data) {
            UserAPI.register(data.email,data.password,data.password_confirmation,data.name)
                .then(function(response) {
                    if(response.data.code != 200) {
                        commit('setBgRegisterValidations',{valid:true,text:response.data.msg});
                    }else {
                        EventBus.$emit('hidden-register');
                        //this.$router.push({path: '/cafes'});
                        dispatch('loadUser');
                    }
                })
                .catch(function() {
                    commit('setBgRegisterValidations',{valid:true,text:'服务异常'});
                })
        },

        /*
         Logs out a user and clears the status and user pieces of
         state.
         */
        logoutUser({commit}) {
            commit('setUserLoadStatus', 0);
            commit('setUser', {});
        },
    },

    /*
     Defines the mutations used
     */
    mutations: {
        /*
         Sets the user load status
         */
        setUserLoadStatus(state, status) {
            state.userLoadStatus = status;
        },

        /*
         Sets the user
         */
        setUser(state, user) {
            state.user = user;
        },

        /*
         Sets the user update status
         */
        setUserUpdateStatus(state, status) {
            state.userUpdateStatus = status;
        },

        setBgValidations(state,bgValidations) {
            state.bgValidations = bgValidations;
        },

        setBgRegisterValidations(state,bgRegisterValidations) {
            state.bgRegisterValidations = bgRegisterValidations;
        }
    },

    /*
     Defines the getters used by the module.
     */
    getters: {
        /*
         Returns the user load status.
         */
        getUserLoadStatus(state) {
            return function () {
                return state.userLoadStatus;
            }
        },

        /*
         Returns the user.
         */
        getUser(state) {
            return state.user;
        },

        /*
         Gets the user update status
         */
        getUserUpdateStatus(state, status) {
            return state.userUpdateStatus;
        },

        getBgValidations(state) {
            return state.bgValidations;
        },

        getBgRegisterValidations(state) {
            return state.bgRegisterValidations;
        }
    }
}