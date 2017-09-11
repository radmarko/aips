using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Business.DataAccess;

namespace AIPS_2017.Hubs
{
    public class Singleton
    {
        private static Singleton _instance;
        public Dictionary<int, Queue<int>> ListOfRooms;

        private static object syncLock = new object();

        protected Singleton()
        {
            ListOfRooms = Plans.CreateRooms();
        }

        public static Singleton GetInstance()
        {
            if (_instance == null)
            {
                lock (syncLock)
                {
                    if (_instance == null)
                    {
                        _instance = new Singleton();
                    }
                }
            }

            return _instance;
        }
    }
}