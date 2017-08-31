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
  var validRows = _.range(n);
  var validCols = _.range(n);
  var solution = new Board({'n': n});

  var solution = new Board({'n': n});

  var addPiece = function(count) {
    var row = count;

    if (count === n) {
      return true;
    }

    for (let col of validCols) {
      solution.togglePiece(row, col);
      
      count++;

      if (!solution.hasAnyRooksConflicts(row, col)) {
        // recursively call on next pieces
        if (addPiece(count)) {
          return true;
        }
      }
      // untoggle on failure
      solution.togglePiece(row, col);
      count--;
    }    
  };

  addPiece(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({'n': n});
  var solutionCount = 0;
  
  var validRows = Array(n);
  var validCols = Array(n);
  validRows.fill(true);
  validCols.fill(true);

  var addPiece = function(count) {
    var row = count;

    if (count === n) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < n; col++) {
      if (validRows[row] && validCols[col]) {
        solution.togglePiece(row, col);
        count++;

        // mark off unavailable rows/cols
        validRows[row] = false;
        validCols[col] = false;

        //if (!solution.hasAnyRooksConflictsOn(row, col)) {
        if (!solution.hasColConflictAt(col) && !solution.hasRowConflictAt(row)) {
          // recursively call on next pieces
          addPiece(count);
        }

        // mark off unavailable rows/cols
        validRows[row] = true;
        validCols[col] = true;

        // untoggle on failure
        solution.togglePiece(row, col);
        count--;
      }    
    }
  };

  addPiece(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});

  var addPiece = function(count) {
    var row = count;

    if (count === n) {
      return true;
    }

    for (var col = 0; col < n; col++) {
      solution.togglePiece(row, col);
      count++;

      if (!solution.hasAnyQueenConflictsOn(row, col)) {
        // recursively call on next pieces
        if (addPiece(count)) {
          return true;
        }
      }

      // untoggle on failure
      solution.togglePiece(row, col);
      count--;
    }    
  };

  addPiece(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var validRows = Array(n);
  var validCols = Array(n);
  validRows.fill(true);
  validCols.fill(true);
 
  var solution = new Board({'n': n});
  var solutionCount = 0;

  var addPiece = function(count) {
    var row = count;
  
    if (count === n) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < n; col++) {
      if (validRows[row] && validCols[col]) {
        solution.togglePiece(row, col);
        count++;

        // mark off unavailable rows/cols
        validRows[row] = false;
        validCols[col] = false;

        //if (!solution.hasAnyQueensConflicts()) {
        if (!solution.hasAnyQueenConflictsOn(row, col)) {
          addPiece(count);
        }
        
        solution.togglePiece(row, col);
        count--;

        validRows[row] = true;
        validCols[col] = true;
      }
    }
  };

  addPiece(0);

  // var solution = new Board({'n': n});
  // var solutionCount = 0;

  // var addPiece = function(count) {
  //   var row = count;

  //   if (count === n) {
  //     solutionCount++;
  //     return;
  //   }

  //   for (var col = 0; col < n; col++) {
  //     solution.togglePiece(row, col);
  //     count++;

  //     if (!solution.hasAnyQueenConflictsOn(row, col)) {
  //       // recursively call on next pieces
  //       addPiece(count);
  //     }
  //     // untoggle on failure
  //     solution.togglePiece(row, col);
  //     count--;
  //   }    
  // };

  // addPiece(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
