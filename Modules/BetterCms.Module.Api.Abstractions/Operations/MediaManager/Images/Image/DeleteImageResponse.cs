﻿using System.Runtime.Serialization;

using BetterCms.Module.Api.Infrastructure;

namespace BetterCms.Module.Api.Operations.MediaManager.Images.Image
{
    /// <summary>
    /// Response for image delete operation.
    /// </summary>
    [DataContract]
    public class DeleteImageResponse : ResponseBase<bool>
    {
    }
}