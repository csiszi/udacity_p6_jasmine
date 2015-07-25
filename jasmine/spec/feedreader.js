'use strict';

/* global $, describe, it, expect, allFeeds, beforeEach, loadFeed, favourites */

$(function() {

    describe('RSS Feeds', function() {


        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('allFeeds elements have URL property with something in it', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            });
        });


         /*
         Check if the feeds are defined and they're not empty
          */
        it('allFeeds elements have name property with something in it', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            });
        });

    });


    /*
    Test the menu
     */
    describe('The menu', function() {

        /*
        We're hiding the menu with setting it's left position
        to -192, check if it's really there.
         */
        it('should have left position -192 by default', function() {
            expect($('.menu').position().left).toBe(-192);
        });


        it('should toggle visibility on click', function() {

            // store selectors
            var menu = $('.menu');
            var body = $('body');
            var menuIcon = $('.header .menu-icon-link');

            var originalTransisiton = menu.css('transition');  // store the current transition (since we'll reset it)
            menu.css('transition', 'all 0s ease 0s');           // reset the transition so we can test it
            expect(body.hasClass('menu-hidden')).toBeTruthy();  // check if the body has .menu-hidden
            expect(menu.position().left).toBe(-192);            // also check that the .menu is really hidden
            menuIcon.trigger('click');                          // trigger clicking
            expect(body.hasClass('menu-hidden')).toBeFalsy();   // check if the .menu-hidden is gone
            expect(menu.position().left).toBe(0);               // also check if it's really there
            menuIcon.trigger('click');                          // trigger close
            expect(body.hasClass('menu-hidden')).toBeTruthy();  // check .menu-hidden
            expect(menu.position().left).toBe(-192);            // check menu position
            menu.css('transition', originalTransisiton);        // write back the original transition

         });

    });


    describe('Initial Entries', function() {

        beforeEach(function(done) { // loadFeed is async
            loadFeed(0, done);
        });

        it('should have at least one .entry in .feed', function(done) {
            expect($('.feed .entry').html().length).toBeGreaterThan(0);
            done();
        });

    });


    describe('New Feed Selection', function() {
        var feedElem = $('.feed');
        var contentsZero;
        // let's empty the feed
        feedElem.empty();

        beforeEach(function(done) {
            loadFeed(0, function() {                    // load the feed with index 0
                contentsZero = feedElem.html();         // store the contents
                loadFeed(1, done);                      // load feed with index 1
            });
        });

        it('should change its content', function(done) {
            expect(feedElem.html()).not.toBe(contentsZero); // expect to be different from contentsZero
            done();
        });

    });


    describe('Favourite articles', function() {

        // load a feed
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('.entry divs should have a .star element', function(done) {
            var entries = $('.feed .entry').toArray();              // store the entries into an array
            entries.forEach(function(entry) {                       // loop through the array
                expect($(entry).find('.star').length).not.toBe(0);  // expect to find .star element
            });
            done();
        });

        // set initial favourites number
        var initialFavouritesNum = favourites().length;
        it('clicking on .star should add the url to the favourites list', function(done) {
            $('.star').first().trigger('click');
            expect(favourites().length).toBeGreaterThan(initialFavouritesNum); // expect that the number of favourite articles is increased
            done();
        });

    });

}());
