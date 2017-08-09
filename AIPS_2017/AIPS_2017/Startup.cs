using Microsoft.Owin;
using Owin;
[assembly: OwinStartup(typeof(AIPS_2017.Startup))]

namespace AIPS_2017
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}