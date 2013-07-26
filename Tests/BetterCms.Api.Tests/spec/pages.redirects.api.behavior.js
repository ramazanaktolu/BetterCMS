﻿/*jslint vars: true*/
/*global describe, it, expect, waits, waitsFor, runs, afterEach, spyOn, $*/

describe('Pages: Redirects', function () {
    'use strict';

    it('01300: Should get a list of redirects', function () {
        var url = '/bcms-api/redirects/',
            result,
            ready = false;

        var data = {
            filter: {
                where: [{ field: 'PageUrl', operation: 'StartsWith', value: '/_0000_' }]
            },
            order: {
                by: [{ field: 'PageUrl' }]
            },
            take: 2,
            skip: 2,
            includeUnpublished: true
        };

        runs(function () {
            api.get(url, data, function (json) {
                result = json;
                ready = true;
            });
        });

        waitsFor(function () {
            return ready;
        }, 'The ' + url + ' timeout.');

        runs(function () {
            expect(result).not.toBeNull();
            expect(result.data).not.toBeNull();
            expect(result.data.totalCount).toBe(4);
            expect(result.data.items.length).toBe(2);

            api.expectBasePropertiesAreNotNull(result.data.items[0]);
            api.expectBasePropertiesAreNotNull(result.data.items[1]);
            expect(result.data.items[0].pageUrl).toBe('/_0000_Redirect_From_3/');
            expect(result.data.items[0].redirectUrl).toBe('/_0000_Redirect_To_3/');
            expect(result.data.items[1].pageUrl).toBe('/_0000_Redirect_From_4/');
            expect(result.data.items[1].redirectUrl).toBe('/_0000_Redirect_To_4/');
        });
    });
    
    it('01301: Should get a redirect by id', function () {
        var url = '/bcms-api/redirects/72EC32B9-D5A4-4642-9D7A-A205009FE9B6',
            result,
            ready = false;

        runs(function () {
            api.get(url, null, function (json) {
                result = json;
                ready = true;
            });
        });

        waitsFor(function () {
            return ready;
        }, 'The ' + url + ' timeout.');

        runs(function () {
            expect(result).not.toBeNull();

            var redirect = result.data;
            expect(redirect).not.toBeNull();
            api.expectBasePropertiesAreNotNull(redirect);
            expect(redirect.pageUrl).toBe('/_0000_Redirect_From_3/');
            expect(redirect.redirectUrl).toBe('/_0000_Redirect_To_3/');
        });
    });

    it('01302: Should get a list with one redirect, filtered by all available columns', function () {
        var url = '/bcms-api/redirects/',
            result,
            ready = false;

        var data = {
            filter: {
                where: [
                    { field: 'Id', value: '23574260f1984c9e98aba207008d08fe' },
                    { field: 'CreatedOn', value: '2013-07-26 08:33:29.000' },
                    { field: 'CreatedBy', value: 'Better CMS test user' },
                    { field: 'LastModifiedOn', value: '2013-07-26 08:36:24.000' },
                    { field: 'LastModifiedBy', value: 'Better CMS test user' },
                    { field: 'Version', value: '2' },
                    
                    { field: 'PageUrl', value: '/01302-from/' },
                    { field: 'RedirectUrl', value: '/01302-to/' }
                ]
            }
        };

        runs(function () {
            api.get(url, data, function (json) {
                result = json;
                ready = true;
            });
        });

        waitsFor(function () {
            return ready;
        }, 'The ' + url + ' timeout.');

        runs(function () {
            expect(result).not.toBeNull();
            expect(result.data).not.toBeNull();
            expect(result.data.totalCount).toBe(1);
            expect(result.data.items.length).toBe(1);

            expect(result.data.items[0].id).toBe('23574260f1984c9e98aba207008d08fe');

            // Check if model properties count didn't changed. If so - update current test filter and another tests.
            expect(data.filter.where.length).toBe(api.getCountOfProperties(result.data.items[0]));
        });
    });
});