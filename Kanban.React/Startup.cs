using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kanban.Domain.Interfaces;
using Kanban.Domain.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Ninject;
using React.AspNet;

namespace Kanban.React
{
    public class Startup
    {
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddReact();
            services.AddMvc();

            return services.BuildServiceProvider();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseReact(config => { });
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }

        private IKernel RegisterApplicationComponents(IApplicationBuilder app)
        {
            // IKernelConfiguration config = new KernelConfiguration();
            var kernel = new StandardKernel();

            kernel.Bind<ICardService>().To<CardService>();

            return kernel;
        }
    }
}
