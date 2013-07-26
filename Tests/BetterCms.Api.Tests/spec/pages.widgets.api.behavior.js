﻿/*jslint vars: true*/
/*global describe, it, expect, waits, waitsFor, runs, afterEach, spyOn, $*/

describe('Pages: Widgets', function () {
    'use strict';

    it('01200: Should get a list of widgets', function () {
        var url = '/bcms-api/widgets/',
            result,
            ready = false;

        var data = {
            filter: {
                where: [{ field: 'Name', operation: 'StartsWith', value: '_0004_' }]
            },
            order: {
                by: [{field: 'Name'}]
            },
            take: 2,
            skip: 1,
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

            var htmlWidget = result.data.items[0];
            api.expectBasePropertiesAreNotNull(htmlWidget);
            expect(htmlWidget.widgetType).toBe('html-widget');
            expect(htmlWidget.name).toBe('_0004_Html_Widget_2');
            expect(htmlWidget.isPublished).toBe(true);
            expect(htmlWidget.publishedOn).not.toBeNull();
            expect(htmlWidget.publishedByUser).toBe('Better CMS test user');
            
            var serverWidget = result.data.items[1];
            api.expectBasePropertiesAreNotNull(serverWidget);
            expect(serverWidget.widgetType).toBe('server-widget');
            expect(serverWidget.name).toBe('_0004_Server_Widget_1');
            expect(serverWidget.isPublished).toBe(true);
            expect(serverWidget.publishedOn).not.toBeNull();
            expect(serverWidget.publishedByUser).toBe('Better CMS test user');
        });
    });
    
    it('01201: Should get an html content widget by id', function () {
        var url = '/bcms-api/widgets/html-content/fa0cbcfb96454fcfa576a205009119c8',
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

            var widget = result.data;
            expect(widget).not.toBeNull();
            api.expectBasePropertiesAreNotNull(widget);
            expect(widget.name).toBe('_0004_Html_Widget_2');
            expect(widget.isPublished).toBe(true);
            expect(widget.publishedOn).not.toBeNull();
            expect(widget.publishedByUser).toBe('Better CMS test user');
            expect(widget.categoryId).not.toBeNull();
            expect(widget.categoryName).toBe('Category for _0004_Html_Widget_2');
            expect(widget.customCss).toBe('custom css');
            expect(widget.useCustomCss).toBe(true);
            expect(widget.html).toBe('_0004_Html_Widget_2 HTML');
            expect(widget.useHtml).toBe(true);
            expect(widget.customJavaScript).toBe("console.log('test')");
            expect(widget.useCustomJavaScript).toBe(true);
        });
    });
    
    it('01202: Should get a server control widget by id', function () {
        var url = '/bcms-api/widgets/server-control/3ac115dfc5f34f148141a205009162cd',
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

            var widget = result.data;
            expect(widget).not.toBeNull();
            api.expectBasePropertiesAreNotNull(widget);
            expect(widget.name).toBe('_0004_Server_Widget_1');
            expect(widget.widgetUrl).toBe('~/Views/Widgets/TestWidget.cshtml');
            expect(widget.previewUrl).toBe('http://www.devbridge.com/Content/styles/images/responsive/logo.png');
            expect(widget.isPublished).toBe(true);
            expect(widget.publishedOn).not.toBeNull();
            expect(widget.publishedByUser).toBe('Better CMS test user');
            expect(widget.categoryId).not.toBeNull();
            expect(widget.categoryName).toBe('Category for _0004_Server_Widget_1');
        });
    });
    
    it('01203: Should get a list with one widget, filtered by all available columns', function () {
        var url = '/bcms-api/widgets/',
            result,
            ready = false;

        var data = {
            filter: {
                where: [
                    { field: 'Id', value: 'd674977e193f4d858b83a20700ac13b6' },
                    { field: 'CreatedOn', value: '2013-07-26 10:26:30.000' },
                    { field: 'CreatedBy', value: 'Better CMS test user' },
                    { field: 'LastModifiedOn', value: '2013-07-26 10:26:50.000' },
                    { field: 'LastModifiedBy', value: 'Better CMS test user' },
                    { field: 'Version', value: '2' },

                    { field: 'Name', value: '01203' },
                    { field: 'IsPublished', value: true },
                    { field: 'PublishedOn', value: '2013-07-26 10:26:50.000' },
                    { field: 'PublishedByUser', value: 'Better CMS test user' },
                    { field: 'CategoryId', value: '1d8dbfbce4bf46c2acb7a20700ac186a' },
                    { field: 'CategoryName', value: '01203' }
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

            expect(result.data.items[0].id).toBe('d674977e193f4d858b83a20700ac13b6');

            // Check if model properties count didn't changed. If so - update current test filter and another tests.
            // data.filter.where.length + 1 <-- Because field WidgetType cannnot be filtered by
            expect(data.filter.where.length + 1).toBe(api.getCountOfProperties(result.data.items[0]));
        });
    });
});