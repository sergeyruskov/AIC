'use strict';

app = angular.module('controller', [])

app.controller('navMenuCtrl',['$scope', 'matchmedia', ($scope, matchmedia)->
	# Сварачиваем главное навигационное меню, когда разрешение становится меньше 767px
	matchmedia.onPhone( (mediaQueryList)->
		$scope.isPhone = mediaQueryList.matches
		if $scope.isPhone
			$scope.isCollapsed = true # В каком состоянии показывать меню на телефоне при загрузке
	);
])

app.controller('listsCtrl', ['$scope', ($scope)->
	#При загрузке страницы список с настроками в открытом или в закрытом состоянии
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

])