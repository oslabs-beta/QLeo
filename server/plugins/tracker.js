const _ = require('lodash');

// a customize function that handle array and number for lodash deep merge
function customizer(objValue, srcValue) {
  // concat the two array if it is an array
  if (_.isArray(objValue)) return objValue.concat(srcValue);
  // sum it up if it is a number
  else if (typeof objValue === 'number') return objValue + srcValue;
}

module.exports = {
  // When the quest is received
  requestDidStart(requestContext) {
    // store the start time of the request
    const requestStart = Date.now();
    // create a placeholder for the performance data
    const performanceData = {};
    
    return {
      // Extract the performance of each resolver using the even cycle
      executionDidStart(){
        return {
          willResolveField({info}) {
            // store the start time of the resolver
            const start = performance.now();

            return (error, result) => {
              // error handler
              if (error) return console.log(`It failed with ${error}`);

              // store the end time of the resolver
              const end = performance.now();

              // create a placeholder for the performance of the individual resolver
              let itemPerformance = {};

              // initialize the performance data of resolver 
              itemPerformance[info.fieldName] = {'time': [], trips: 0};
              itemPerformance[info.fieldName].time.push(end - start);
              itemPerformance[info.fieldName].trips += 1;

              // create a placeholder that we can use to traverse over the info object
              let current = info.path;

              // create the resulting object for performance that we want to send back to our front end
              while (current !== undefined) {
                if (current.typename !== undefined){
                  const temp = {};
                  temp[current.typename] = itemPerformance;
                  itemPerformance = temp;
                }
                current = current.prev;
              }

              // merge the individual resolver performance object with the exisiting performance object
              _.mergeWith(performanceData, itemPerformance, customizer);
            };
          },
        };
      },
      // Customize data before sending back to client
      willSendResponse (context) {
        // record the request completion time
        const stop = Date.now();
        // compute the time spent to resolve request
        const elapsed = stop - requestStart;
        // compute the size of the returned response data in bytes
        const size = JSON.stringify(context.response).length * 2;
        // store the time spent to resolve request in performance data
        performanceData.queryTime = elapsed;
        // attach performance data to the response that get sent back to client
        context.response.extensions = {performanceData};
      }
    };
  },
};