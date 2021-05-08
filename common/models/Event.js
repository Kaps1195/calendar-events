module.exports = function (Event) {

    const app = require('../../server/server');
    const ds = app.datasources.assignment;

    Event.addEvent = async function (startdate, enddate, starttime, endtime, eventname) {
        try {
            // Sanity check regarding overlapping events
            const overlapQueryPromise = () => {
                return new Promise((resolve, reject) => {
                    ds.connector.query('CALL getOverlappingEvents(?,?,?)', [startdate, starttime, endtime], function(err, result) {
                        if (err) {
                          return reject(err);
                        }
                        return resolve(result[0]);       
                      });
                });
            };
            const events = await overlapQueryPromise();
            console.log(events);
            if(events.length >= 1) return { success: false, message: 'Cannot insert due to overlap!' }

            const insertEventResponse = await Event.create({
                eventname,
                startdate,
                enddate,
                starttime,
                endtime
            });

            return {
                success: true,
                message: 'Created Event Successfully!',
                data: insertEventResponse
            }
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
        
    Event.remoteMethod('addEvent', {
        http: { path: '/addEvent', verb: 'post', status: 200, errorStatus: 500 },
        accepts: [
            { arg: 'startdate', type: 'date', required: true },
            { arg: 'enddate', type: 'date' },
            { arg: 'starttime', type: 'string', required: true },
            { arg: 'endtime', type: 'string', required: true },
            { arg: 'eventname', type: 'string', required: true }
        ],
        returns: { arg: 'response', type: 'object', root: 'true' }
    });

    Event.getCalendar = async function (startdate, enddate) {
        try {
            const eventQueryPromise = () => {
                return new Promise((resolve, reject) => {
                    ds.connector.query('CALL getCalendar(?,?)', [startdate, enddate], function(err, result) {
                        if (err) {
                          return reject(err);
                        }
                        return resolve(result[0]);       
                      });
                });
            };
            const events = await eventQueryPromise();
            if(events.length === 0) return { success: false, message: 'No events found within the given range!' }

            return {
                success: true,
                message: 'Fetched Events Successfully!',
                data: events
            }
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
        
    Event.remoteMethod('getCalendar', {
        http: { path: '/getCalendar', verb: 'post', status: 200, errorStatus: 500 },
        accepts: [
            { arg: 'startdate', type: 'date', required: true },
            { arg: 'enddate', type: 'date', required: true }
        ],
        returns: { arg: 'response', type: 'object', root: 'true' }
    });
}