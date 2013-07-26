﻿/*jslint vars: true*/
/*global api, describe, it, expect, waits, waitsFor, runs, afterEach, spyOn, jcsvSerialize, $ */

describe('Root: Layouts', function() {
    'use strict';

    it('00100: Should get a filtered, sorted and paged layout list', function () {
        var url = '/bcms-api/layouts/',
            result,
            ready = false;
        
        var data = {
                filter: {
                    connector: 'and',
                    where: [
                        { field: 'Name', operation: 'NotEqual', value: 'NOT_FOUND' },
                        { field: 'Name', operation: 'StartsWith', value: '_0001_' }
                    ],
                    inner: [
                        {
                            connector: 'or',
                            where: [
                                { field: 'Name', operation: 'Contains', value: 'Layout1' },
                                { field: 'Name', operation: 'NotContains', value: 'NOT_FOUND' }
                            ]
                        }
                    ]
                },
                order: {
                    by: [
                        { field: 'Name' },
                        { field: 'LastModifiedOn', Direction: 'desc' }
                    ]
                },
                skip: 2,
                take: 2
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

            // Layout 1
            expect(result.data.items[1].name).toBe('_0001_Layout4');
            
            // Layout 0
            api.expectBasePropertiesAreNotNull(result.data.items[0]);
            expect(result.data.items[0].name).toBe('_0001_Layout3 for _0000_Page_For_Tests');
            expect(result.data.items[0].layoutPath).toBe('~/Areas/bcms-installation/Views/Shared/DefaultLayout.cshtml');
            expect(result.data.items[0].previewUrl).toBe('http://www.devbridge.com/Content/styles/images/responsive/logo.png');
        });
    });

    it('00101: Should get a layout by id', function () {
        var url = '/bcms-api/layouts/d2f39fbd2c28401a8625a1fe0114e1eb',
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
            expect(result.data).not.toBeNull();

            // Layout
            api.expectBasePropertiesAreNotNull(result.data);
            expect(result.data.name).toBe('_0001_Layout3 for _0000_Page_For_Tests');
            expect(result.data.layoutPath).toBe('~/Areas/bcms-installation/Views/Shared/DefaultLayout.cshtml');
            expect(result.data.previewUrl).toBe('http://www.devbridge.com/Content/styles/images/responsive/logo.png');
        });
    });
    
    it('00102: Should get layout regions by layout id', function () {
        var url = '/bcms-api/layouts/d2f39fbd2c28401a8625a1fe0114e1eb/regions',
            result,
            ready = false;

        var data = {
            order: {
                by: [
                    { field: 'RegionIdentifier', direction: 'desc' }
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
            expect(result.data.items).not.toBeNull();
            expect(result.data.items.length).toBe(3);

            api.expectBasePropertiesAreNotNull(result.data.items[0]);
            expect(result.data.items[0].regionIdentifier).toBe('CMSMainContent');
            expect(result.data.items[1].regionIdentifier).toBe('CMSHeader');
            expect(result.data.items[2].regionIdentifier).toBe('CMSFooter');
        });
    });
    
    it('00103: Should get a list with one layout, filtered by all available columns', function () {
        var url = '/bcms-api/layouts/',
            result,
            ready = false;

        var data = {
            filter: {
                where: [
                    { field: 'Id', value: '33d04bd9e37f40ecaad5a20700adbe11' },
                    { field: 'CreatedOn', value: '2013-07-26 10:32:34.000' },
                    { field: 'CreatedBy', value: 'Better CMS test user' },
                    { field: 'LastModifiedOn', value: '2013-07-26 10:32:34.000' },
                    { field: 'LastModifiedBy', value: 'Better CMS test user' },
                    { field: 'Version', value: '1' },

                    { field: 'Name', value: '00103' },
                    { field: 'LayoutPath', value: '~/Areas/bcms-installation/Views/Shared/DefaultLayout.cshtml' },
                    { field: 'PreviewUrl', value: 'http://www.devbridge.com/Content/styles/images/responsive/logo.png' }
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

            expect(result.data.items[0].id).toBe('33d04bd9e37f40ecaad5a20700adbe11');

            // Check if model properties count didn't changed. If so - update current test filter and another tests.
            expect(data.filter.where.length).toBe(api.getCountOfProperties(result.data.items[0]));
        });
    });
    
    it('00104: Should get a list with one layout region, filtered by all available columns', function () {
        var url = '/bcms-api/layouts/1030da610baa40ccb484a20700b21ec2/regions/',
            result,
            ready = false;

        var data = {
            filter: {
                where: [
                    { field: 'Id', value: 'c0830f40833043c3b108a20700b21ec2' },
                    { field: 'CreatedOn', value: '2013-07-26 10:48:30.000' },
                    { field: 'CreatedBy', value: 'Better CMS test user' },
                    { field: 'LastModifiedOn', value: '2013-07-26 10:48:30.000' },
                    { field: 'LastModifiedBy', value: 'Better CMS test user' },
                    { field: 'Version', value: '1' },

                    { field: 'RegionIdentifier', value: '00104' },
                    { field: 'Description', value: 'Region description' }
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

            expect(result.data.items[0].id).toBe('c0830f40833043c3b108a20700b21ec2');

            // Check if model properties count didn't changed. If so - update current test filter and another tests.
            expect(data.filter.where.length).toBe(api.getCountOfProperties(result.data.items[0]));
        });
    });
});