using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Entities;
using ReactCore.Hubs;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ReactCore.Helpers;
using Entities.Models;
using ReactCore.Services;
using Microsoft.AspNetCore.Mvc;
using NLog;
using System.IO;
using ReactCore.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using Microsoft.AspNetCore.HttpOverrides;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.Formatters;
using Newtonsoft.Json.Serialization;

namespace ReactCore
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public string connectionString { get; private set; }

        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
            connectionString = Configuration["CONNECTION_STRING"];
        }

        

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            
            


            //services.AddSpaStaticFiles();
            services.AddSignalR();

            services.ConfigureCors();



            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            services.ConfigureLoggerService();

            //add Identity
            services.ConfigureIdentity();

        
 

            services.AddTransient<IEmailSender, EmailSender>();

            services.ConfigureMyDbContext(Configuration);
            services.ConfigureRepositoryWrapper();
            //


            services.AddMvc(config =>
            {
                config.RespectBrowserAcceptHeader = true;
                config.ReturnHttpNotAcceptable = true;

                config.InputFormatters.Add(new XmlSerializerInputFormatter());
                config.OutputFormatters.Add(new XmlSerializerOutputFormatter());
                config.OutputFormatters.Add(new PascalCaseJsonProfileFormatter());
            })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());


            services.ConfigureAutoMapperContext();



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true,
                });
                //app.UseDatabaseErrorPage();
            }
            else
            {
                //app.UseExceptionHandler("/error");
            }

            //for linux deploymeny
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseStaticFiles();
            //app.UseSpaStaticFiles();
            app.UseHttpsRedirection(); //this maybe
            app.UseSignalR(routes => { routes.MapHub<OnlineHub>("/onlineHub"); });


            // global cors policy
            app.UseCors("CorsPolicy");
 

            app.UseCookiePolicy();

            app.UseAuthentication();

            app.UseMvc( routes =>{
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}"
                );
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" }
                );
            });

        }
    }
}




/*
 

                //Add Cookie
            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(15);

                options.LoginPath = "/Identity/Account/Login";
                options.AccessDeniedPath = "/Identity/Account/AccessDenied";
                options.SlidingExpiration = true;
            });


            // configure jwt authentication



    */
