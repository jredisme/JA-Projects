# Import deque
from collections import deque

class Vertex:
    ''' This class represents a vertex in a graph'''
    def __init__(self, label: str):
        self.label = label
        
    def __repr__(self):
        return self.label

class Graph:
    ''' This class represents a graph, in this case, a directed graph'''
    def __init__(self):
        self.adjacency_list = {}    #dict that can map a Vertex to a list of adjacent vertices
        self.edge_weights = {}      #dict with an edge (Vertex tuple pair) as key, weight as value
    
    def add_vertex(self, label):
        ''' This method adds a vertex with the specified label. 
        It returns the graph. Label must be a string.'''
        # Make sure the label is a string
        if not isinstance(label, str):
            raise ValueError("label must be a string")
        else:
        # If it is, create a new vertex, with the passed str as the label.
        # Also, create a new empty adjacency_list value, with the new Vertex as the key
            new_vertex = Vertex(label)
            self.adjacency_list[new_vertex] = []
            return self
    
    def add_edge(self, src, dest, w = 1.0):
        ''' This method adds an edge from vertex src to vertex dest with weight w'''
        valid_src = False
        valid_dest = False
        # First, make sure the source and destination vertexes are valid.
        for vertex in self.adjacency_list:
            if vertex.label == src:
                valid_src = True
                src_vertex = vertex     # found the desired source vertex
            if vertex.label == dest:
                valid_dest = True
                dest_vertex = vertex    # found the desired destination vertex
        # If either the source or destination vertex is invalid, raise an error.
        if not valid_src or not  valid_dest:
            raise ValueError ("Source and destination must be vertex labels in adjacency list")
        # If the weight is not a float, raise an error.
        elif not isinstance(w, float):
            raise ValueError("Weight, w, must be a float")
        # Otherwise, create a new edge.
        else:
            # With a tuple of src and dest as key, the value in edge_weights is the new weight
            self.edge_weights[(src_vertex, dest_vertex)] = w
            # For the specified source vertex, add the destination vertex as a neighbor
            self.adjacency_list[src_vertex].append(dest_vertex)
            return self
            
    def __str__(self):
        ''' This magic method produces a string representation of the graph, for print(). 
        The format is in GraphViz dot notation'''
        output_str = "digraph G {" + "\n"
        for edge, w in self.edge_weights.items():
            # For each edge, print the source label, destination label, edge label, and edge weight
            # The edge label is the same as its weight for this project
            output_str += f'   {edge[0]} -> {edge[1]} [label="{w}",weight="{w}"];'
            output_str += "\n"
        output_str += "}"
        return output_str
    
    def get_weight(self, src, dest):
        '''This method returns the weight on edge src-dest.'''
        valid_src = False
        valid_dest = False
        for vertex in self.adjacency_list:
            if vertex.label == src:
                valid_src = True
                src_vertex = vertex
            if vertex.label == dest:
                valid_dest = True
                dest_vertex = vertex
        if not valid_src or not  valid_dest:
            raise ValueError ("Source and destination must be vertex labels in adjacency list")
        else:
            return self.edge_weights.get((src_vertex, dest_vertex))
            
    def dfs(self, start_vertex_label):
        ''' This method performs a Depth First Search.
        DFS explores as deeply as possible before backtracking'''
        output_str = ""
        # Find the start vertex
        valid_start = False
        for vertex in self.adjacency_list:
            if vertex.label == start_vertex_label:
                valid_start = True
                start_vertex = vertex
        if not valid_start:
            raise ValueError ("Invalid start vertex")
        else:
            # Make a stack, which is a list of neighbors for the given vertex.
            vertex_stack = [start_vertex]
            # Make an empty set to keep track of which vertices have been visited.
            visited_set = set()
            # While the stack is not empty
            while len(vertex_stack) > 0:
                #Get the vertex at the top of the stack
                current_vertex = vertex_stack.pop()
                # If the current vertex has not been visited yet
                if current_vertex not in visited_set:
                    # Add the current vertex label to the output.
                    output_str += current_vertex.label
                    # Add the current vertex to the visited set.
                    visited_set.add(current_vertex)
                    # This project requires visiting to be done alphabetically.
                    # Sort the current vertex's neighbors by label, using lambda
                    # Sort in reverse order, because we want the top of the stack to contain the next vertex alphebetically
                    for adjacent_vertex in sorted(self.adjacency_list[current_vertex], key=lambda v: v.label, reverse=True):
                        vertex_stack.append(adjacent_vertex)
            return output_str

    def bfs(self, start_vertex_label):
        ''' This method performs a Breadth First Search.
        BFS explores level by level, moving outward'''
        output_str = ""
        # Find the start vertex
        valid_start = False
        for vertex in self.adjacency_list:
            if vertex.label == start_vertex_label:
                valid_start = True
                start_vertex = vertex
        if not valid_start:
            raise ValueError ("Invalid start vertex")
        else:
            # Make a deque, which contains a list of neighbors for the given vertex.
            vertex_deque = deque([start_vertex])
            # Make an empty set to keep track of which vertices have been visited.
            visited_set = set()
            # While the deque is not empty
            while vertex_deque:
                # Get the vertex at the front of the deque
                current_vertex = vertex_deque.popleft()
                # If the current vertex has not been visited
                if current_vertex not in visited_set:
                    # Add the current vertex label to the output.
                    output_str += current_vertex.label
                    # Add the current vertex to the visited set.
                    visited_set.add(current_vertex)
                    # Sort current vertex's neighbors by label, using lambda
                    for adjacent_vertex in sorted(self.adjacency_list[current_vertex], key=lambda v: v.label):
                        if adjacent_vertex not in visited_set:
                            vertex_deque.append(adjacent_vertex)
        return output_str


#dsp(src, dest): Return a tuple (path length , the list of vertices on the path from src to dest). If no path exists, return the tuple (math.inf, empty list.)
#dsp_all(src): Return a dictionary of the shortest weighted path between src and all other vertices using Dijkstra's Shortest Path algorithm. In the dictionary, the key is the the destination vertex label, the value is a list of vertices on the path from src to dest inclusive.



def main():
    # Initialize graph
    G = Graph()

    # Create and add vertices A-F
    G.add_vertex("A")
    G.add_vertex("B")
    G.add_vertex("C")
    G.add_vertex("D")
    G.add_vertex("E")
    G.add_vertex("F")

    # Add directed graph edges
    G.add_edge ("A", "B", 2.0)
    G.add_edge ("A", "F", 9.0)
    G.add_edge ("B", "C", 8.0)
    G.add_edge ("B", "D", 15.0)
    G.add_edge ("B", "F", 6.0)
    G.add_edge ("C", "D", 1.0)
    G.add_edge ("E", "C", 7.0)
    G.add_edge ("E", "D", 3.0)
    G.add_edge ("F", "B", 6.0)
    G.add_edge ("F", "E", 3.0)

    # print graph
    print(G)

    #Get weight for A -> B
    #print(G.get_weight("A", "B"))
    
    # Perform DFS search and print
    print("starting DFS with vertex A")
    print(G.dfs("A"))
    
    # Perform BFS search and print
    print("starting BFS with vertex A")
    print(G.bfs("A"))

if __name__== "__main__":
    main()
