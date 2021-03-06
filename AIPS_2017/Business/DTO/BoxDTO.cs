﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DTO
{
    public class BoxDTO
    {
        public int Id { get; set; }
        public int PlanId { get; set; }
        public float Width { get; set; }
        public float Height { get; set; }
        public float Depth { get; set; }
        public float BoardThickness { get; set; }
        public float PositionX { get; set; }
        public float PositionY { get; set; }
        public float PositionZ { get; set; }
        public string Name { get; set; }
        public string Texture { get; set; }
        public bool vertikalno { get; set; }
        public bool horizontalno { get; set; }
        public float globalX { get; set; }
        public float globalY { get; set; }
        public float globalZ { get; set; }

    }
}
