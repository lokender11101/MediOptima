#ifndef GRAPH_H
#define GRAPH_H

#include <vector>
#include <string>
#include <unordered_map>

struct Edge {
    int target_node;
    double weight;
};

class Graph {
private:
    std::unordered_map<int, std::vector<Edge>> adjList;

public:
    void addEdge(int u, int v, double weight);
    std::vector<int> shortestPath(int start, int end);
    double getDistance(int start, int end);
};

#endif
