using Flurl.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace FAI.API.Middlewares
{
    public class GlobalErrorHandlerMiddleware
    {
        #region Fields

        private readonly ILogger<GlobalErrorHandlerMiddleware> _logger;
        private readonly RequestDelegate _next;

        #endregion

        #region Constructors

        public GlobalErrorHandlerMiddleware(RequestDelegate next, ILogger<GlobalErrorHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        #endregion

        #region Methods

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleErrorAsync(context, ex);
            }
        }

        private Task HandleErrorAsync(HttpContext context, Exception exception)
        {
            var text = JsonSerializer.Serialize(new
            {
                Code = "internal.server.error",
                ErrorMessage = exception.Message,
            });

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 400;
            return context.Response.WriteAsync(text);
        }

        private Task HandleFlurlException(HttpContext context, FlurlHttpException exception)
        {
            var errorResponse = exception.GetResponseStringAsync().Result;
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = exception.Call.Response.StatusCode;

            return context.Response.WriteAsync(errorResponse);
        }

        #endregion
    }

    public static class GlobalErrorHandlerMiddlewareExtensions
    {
        #region Methods

        public static IApplicationBuilder UseGlobalErrorHandlerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<GlobalErrorHandlerMiddleware>();
        }

        #endregion
    }
}