using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.DTO;
using Database;

namespace Business.DataAccess
{
    public static class Boards
    {
        public static int Create(BoardDTO boardCreate)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                Board board = new Board()
                {
                    BoxId = boardCreate.BoxId,
                    Width = boardCreate.Width,
                    Height = boardCreate.Height,
                    BoardThickness = boardCreate.BoardThickness,
                    PositionX = boardCreate.PositionX,
                    PositionY = boardCreate.PositionY,
                    PositionZ = boardCreate.PositionZ,
                    Name = boardCreate.Name,
                    Texture = boardCreate.Texture
                };

                db.Boards.InsertOnSubmit(board);
                db.SubmitChanges();

                return board.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return -1;
        }

        public static BoardDTO Read(int boardId)
        {
            BoardDTO boardRead = null;

            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from board in db.Boards
                     where board.Id == boardId
                     select board).Single();

                boardRead = new BoardDTO()
                {
                    Id = find.Id,
                    BoxId = find.BoxId,
                    Width = find.Width,
                    Height = find.Height,
                    BoardThickness = find.BoardThickness,
                    PositionX = find.PositionX,
                    PositionY = find.PositionY,
                    PositionZ = find.PositionZ,
                    Name = find.Name,
                    Texture = find.Texture
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return boardRead;
        }

        public static void Update(BoardDTO updateBoard)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from board in db.Boards
                     where board.Id == updateBoard.Id
                     select board).Single();

                find.BoxId = updateBoard.BoxId;
                find.Width = updateBoard.Width;
                find.Height = updateBoard.Height;
                find.BoardThickness = updateBoard.BoardThickness;
                find.PositionX = updateBoard.PositionX;
                find.PositionY = updateBoard.PositionY;
                find.PositionZ = updateBoard.PositionZ;
                find.Name = updateBoard.Name;
                find.Texture = updateBoard.Texture;

                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void Delete(int boardId)
        {
            try
            {
                databaseDataContext db = new databaseDataContext();

                var find =
                    (from board in db.Boards
                     where board.Id == boardId
                     select board).Single();

                db.Boards.DeleteOnSubmit(find);
                db.SubmitChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

    }
}
