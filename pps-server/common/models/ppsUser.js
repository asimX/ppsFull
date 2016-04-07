module.exports = function(ppsUser) {
  var app = require('../../server/server');

  /*
  * Function to return list of Roles to choose from.
  * Returns Array of Role Objects
  * */
  ppsUser.getRoles = function(cb){

    var Role = app.models.Role;

    Role.find({}, function (err, foundRole){
      if (err) return cb(err);
      
      console.log(foundRole);
      cb(null, foundRole);
    });
  };

  ppsUser.remoteMethod(
    'getRoles',
    {
      http: {path: '/getRoles', verb: 'get'},
      returns: {arg: 'rolesList', type: 'Array'}
    }
  );

  ppsUser.afterRemote('create', function(ctx, ppsUser, next){
    var async = require('async');
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    console.log("ctx roles: ",ctx.args.data.roles);
    var rolesList = ctx.args.data.roles;

    console.log("ctx id: ", ctx.result.id);
    var userId = ctx.result.id;

    async.forEach(ctx.args.data.roles, function (role, cb) {
      Role.find({
        where: {name: role}
      }, function (err, foundRole) {
        if (err) throw err;

        console.log('Found matching role :', foundRole);

        //create RoleMapping entry to add principal (user) to role
        foundRole[0].principals.create({
          principalType: RoleMapping.USER,
          principalId: userId
        }, function (err, principal) {
          if (err) throw err;

          console.log('Created role-mapping:', principal);
        });
      });
    }, function (err) {
      if (err) {
        return console.log(err);
      }
    });
    next();
  });

};
