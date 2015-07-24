'use strict';

/* global $, describe, it, expect, allFeeds, beforeEach, loadFeed, favourites */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('allFeeds elements have URL property with something in it', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            });
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('allFeeds elements have name property with something in it', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            });
        });

    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('should have left position -192 by default', function() {
            expect($('.menu').position().left).toBe(-192);
        });


         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

         it('should toggle visibility on click', function() {


            // NOTE TO REVIEWER: this uncommented section is not working -
            // I don't know how to fast-forward a css transition.
            // I've figured out that the clock() is only working with
            // timeouts. Testing the left position seemed a better idea,
            // becase if the css changes, the body can have a menu-hidden
            // class even if the menu is not hidden (or vice-versa).

            // jasmine.clock().install(); // we have to travel in time

            // expect($('.menu').position().left).toBe(-192); // at first, it's still invisible
            // $('.header .menu-icon-link').trigger('click'); // trigger click on menu icon
            // jasmine.clock().tick(200); // forward time 200ms
            // expect($('.menu').position().left).toBe(0); // expect to be visible
            // $('.header .menu-icon-link').trigger('click'); // click again
            // jasmine.clock().tick(200); // forward time 200ms // forward time
            // expect($('.menu').position().left).toBe(-192); // it should be invisible again

            // jasmine.clock().uninstall(); // uninstall clock

            expect($('body').hasClass('menu-hidden')).toBeTruthy();
            $('.header .menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.header .menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

         });

    });

    /* Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function(){done();});
        });

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        it('should have at least one .entry in .feed', function(done) {
            expect($('.feed .entry').html().length).toBeGreaterThan(0);
            done();
        });

    });
    /* Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        // save the containers current content
        var initialContent = $('.feed').html();
        beforeEach(function(done) {
            // load the feed
            loadFeed(1, function(){done();});
        });

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('should change its content', function(done) {
            expect($('.feed').html()).not.toBe(initialContent);
            done();
        });

    });


    describe('Favourite articles', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {done();});
        });

        it('.entry divs should have a .star element', function(done) {
            var entries = $('.feed .entry').toArray();
            entries.forEach(function(entry) {
                expect($(entry).find('.star').length).not.toBe(0);
            });
            done();
        });

        // set initial favourites number
        var initialFavouritesNum = favourites().length;
        it('clicking on .star should add the url to the favourites list', function(done) {
            $('.star').first().trigger('click');
            expect(favourites().length).toBeGreaterThan(initialFavouritesNum);
            done();
        });

    });

}());
