#ifndef OPTIMIZER_H
#define OPTIMIZER_H

#include <vector>
#include <string>
#include <unordered_map>
#include <set>

struct Pharmacy {
    int id;
    std::string name;
    std::vector<std::string> inventory;
    double cost_multiplier;
};

class Optimizer {
public:
    // Greedy Set Cover algorithm to find the minimum number of pharmacies to fulfill all required medicines
    std::vector<Pharmacy> computeOptimalSet(const std::vector<std::string>& required_meds, const std::vector<Pharmacy>& all_pharmacies);
};

#endif
