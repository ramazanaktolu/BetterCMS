﻿using System;

using BetterCms.Module.WebApi.Models.Enums;

namespace BetterCms.Module.WebApi.Models
{
    /// <summary>
    /// Represents class for filtering items
    /// </summary>
    [Serializable]
    public class FilterItem
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="FilterItem" /> class.
        /// NOTE: required for JavaScript serialization
        /// </summary>
        public FilterItem()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="FilterItem" /> class.
        /// </summary>
        /// <param name="field">The filtering field.</param>
        /// <param name="value">The filtering value.</param>
        /// <param name="operation">The filtering operation.</param>
        public FilterItem(string field, object value, FilterOperation operation = FilterOperation.Equal)
        {
            Field = field;
            Value = value;
            Operation = operation;
        }

        /// <summary>
        /// Gets or sets the filtering field.
        /// </summary>
        /// <value>
        /// The filtering field.
        /// </value>
        public string Field { get; set; }

        /// <summary>
        /// Gets or sets the filtering value.
        /// </summary>
        /// <value>
        /// The filtering value.
        /// </value>
        public object Value { get; set; }

        /// <summary>
        /// Gets or sets the filtering operation.
        /// </summary>
        /// <value>
        /// The filtering operation.
        /// </value>
        public FilterOperation Operation { get; set; }
    }
}