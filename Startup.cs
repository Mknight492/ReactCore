using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReactCore.Data;
using ReactCore.Hubs;

namespace ReactCore
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public string connectionString { get; private set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            connectionString = Configuration["CONNECTION_STRING"];
        }

        

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddDbContext<ApplicationDbContext>(options
                => options.UseSqlServer(connectionString));
            //services.AddSpaStaticFiles();
            services.AddSignalR();
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
                app.UseDatabaseErrorPage();
            }

            app.UseStaticFiles();
            //app.UseSpaStaticFiles();
            app.UseHttpsRedirection(); //this maybe
            app.UseSignalR(routes => { routes.MapHub<OnlineHub>("/onlineHub"); });

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
