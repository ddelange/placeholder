
var _ = require('lodash');

function TokenGraph(){
  this.nodes = {};
  this.edges = {};
}

TokenGraph.prototype.addToken = function( id, token ){
  if( !this.nodes.hasOwnProperty( token ) ){ this.nodes[ token ] = []; }
  this.nodes[ token ].push( id );
};

TokenGraph.prototype.setEdge = function( id1, id2, role ){
  var key = id1 + ( role ? ':' + role : '' );
  if( !this.edges.hasOwnProperty( key ) ){ this.edges[ key ] = []; }
  this.edges[ key ].push( id2 );
};

TokenGraph.prototype.sort = function(){

  // sort array
  for( var token in this.nodes ){
    this.nodes[ token ] = _.sortedUniq( _.sortBy( this.nodes[ token ] ) );
  }

  // sort edges
  for( var key in this.edges ){
    this.edges[ key ] = _.sortedUniq( _.sortBy( this.edges[ key ] ) );
  }
};

TokenGraph.prototype.outEdges = function( id, role ){
  return this.edges[ id + ( role ? ':' + role : '' ) ] || [];
};

// // convenience function to instantiate graph with preset values
// TokenGraph.from = function( nodes, edges ){
//   var graph = new TokenGraph();
//   graph.nodes = nodes;
//   graph.edges = edges;
//   return graph;
// };

module.exports = TokenGraph;