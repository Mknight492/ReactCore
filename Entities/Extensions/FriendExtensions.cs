using Entities.Models;
using Entities.Models.FriendViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Extensions
{
    public static class FriendExtensions
    {
        public static void MapAddFriendToFriend(this Friend newFriend, AddFriendModel friendToAdd )
        {
            newFriend.Name = friendToAdd.Name;
            newFriend.LocationId = (friendToAdd.LocationId != null)? (int)friendToAdd.LocationId : newFriend.LocationId;
        }
    }
}
