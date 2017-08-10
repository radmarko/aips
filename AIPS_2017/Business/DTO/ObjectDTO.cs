using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DTO
{
    public class ObjectDTO
    {
        public float Width { get; set; }
        public float Height { get; set; }
        public float Depth { get; set; }
        public string Name { get; set; }
        public float BoardThickness { get; set; }
        public float PositionX { get; set; }
        public float PositionY { get; set; }
        public float PositionZ { get; set; }
        public string Texture { get; set; }
        public List<BoardDTO> childs { get; set; } //daske
        public List<DrawerDTO> nizFioka { get; set; }
        public List<bool> pozicije_fioka { get; set; } 
        public List<DoorDTO> nizVrata { get; set; }
        public List<bool> pozicije_vrata { get; set; } 
        public bool vertikalno { get; set; }
        public bool horizontalno { get; set; }
        public float globalX { get; set; }
        public float globalY { get; set; }
        public float globalZ { get; set; }

    }
}
