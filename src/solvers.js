/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});
  
  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      solution.togglePiece(r, c);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(r, c);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});
  var count = 0;

  var queens = [];
  var result;

  var addPiece = function(currCount) {

    var row = currCount;

    if (currCount === n) {
      result = solution.rows();
      //queens = queens.concat(result);
      //queens.push(result[0]);
      //return solution.rows();
      return true;
    } else {

      for (var col = 0; col < n; col++) {
        solution.togglePiece(row, col);
        currCount++;

        if (!solution.hasAnyQueenConflictsOn(row, col)) {

          // queens.push([row, col]);
          // recursively call on next pieces
          queens[row] = [row, col];
          if (addPiece(currCount)) {
            return true;
          }
        }
        // untoggle on failure
        solution.togglePiece(row, col);
        currCount--;
        
      }
    }

    //return addPiece(currCount--);
    
  };

  addPiece(count);

  //return returnVal;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
  //return queens;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
