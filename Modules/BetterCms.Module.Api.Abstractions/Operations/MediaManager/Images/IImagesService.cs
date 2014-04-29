﻿namespace BetterCms.Module.Api.Operations.MediaManager.Images
{
    public interface IImagesService
    {
        /// <summary>
        /// Gets images list.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns><c>GetImagesResponse</c> with images list.</returns>
        GetImagesResponse Get(GetImagesRequest request);

        // NOTE: do not implement: replaces all the tags.
        // PutTagsResponse Put(PutTagsRequest request);

        /// <summary>
        /// Creates a new image.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns><c>PostImagesResponse</c> with a new image id.</returns>
        PostImagesResponse Post(PostImagesRequest request);

        // NOTE: do not implement: drops all the images.
        // DeleteImagesResponse Delete(DeleteImagesRequest request);
    }
}
