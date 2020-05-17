using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Helpers
{
    interface IFile
    {
        bool UploadFile(IFormFile image, string path);
        bool DeleteFiles(string[]files);
    }
}
