'use strict';

app = angular.module('settings', [])

app.controller('listsCtrl', ['$scope', '$http', ($scope, $http)->
	#При загрузке страницы список с настройками в открытом или в закрытом состоянии
	$scope.isCollapsedSettings = false

	# Кнопки переключения подписок

	# Чтобы при загрузке переключатели сразу стояли в нужном положении, а не перемещались с transition, transition надо обнулить, но потом переключатели должны идти с transition, поэтому этот класс надо удалить
	@class = 'first_load_toggle'

	@delete_first_load_toggle = ()=>
		if @class == "first_load_toggle"
			@class = "";

	@toggle = ()->
		toggle_off: 0
		move_toggle: (togglePosition)->
			@toggle_off = togglePosition


	# YouTube
	@youtube_toggle = new @toggle
	@youtube_toggle.toggle_off = 1
	#ХабраХабр
	@habrahabr_toggle = new @toggle
	@habrahabr_toggle.toggle_off = 0
	#Пикабу
	@pikabu_toggle = new @toggle
	@pikabu_toggle.toggle_off = 1
	#Триникси
	@trinixy_toggle = new @toggle
	@trinixy_toggle.toggle_off = 0
	#Motor
	@motor_toggle = new @toggle
	@motor_toggle.toggle_off = 1





	#Получение новостей. Важно помнить, что получаем мы их не сразу

	$http.get('json/subscribe.json').success((data)=>
		@successAnswer(data)
	)

	@successAnswer = (data) =>
		subscribe = data.subscribe

		@youtube = subscribe.youtube
		@habrahabr = subscribe.habrahabr



])#Конец контроллера