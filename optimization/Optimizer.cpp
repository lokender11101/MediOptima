#include <iostream>
#include <vector>
#include <string>
#include "Optimizer.h"
#include <algorithm>

// Very simplified Greedy Set Cover implementation for Phase 4 scaffold
std::vector<Pharmacy> Optimizer::computeOptimalSet(const std::vector<std::string>& required_meds, const std::vector<Pharmacy>& all_pharmacies) {
    std::set<std::string> unmet_needs(required_meds.begin(), required_meds.end());
    std::vector<Pharmacy> selected;
    
    // Create a copy to track which pharmacies are still available
    std::vector<Pharmacy> remaining_pharmacies = all_pharmacies;

    while (!unmet_needs.empty() && !remaining_pharmacies.empty()) {
        int best_idx = -1;
        int max_covered = 0;
        
        for (size_t i = 0; i < remaining_pharmacies.size(); ++i) {
            int covered = 0;
            for (const auto& item : remaining_pharmacies[i].inventory) {
                if (unmet_needs.count(item)) covered++;
            }
            if (covered > max_covered) {
                max_covered = covered;
                best_idx = i;
            }
        }
        
        if (best_idx == -1 || max_covered == 0) break; // Can't fulfill remaining
        
        selected.push_back(remaining_pharmacies[best_idx]);
        
        // Remove covered items
        for (const auto& item : remaining_pharmacies[best_idx].inventory) {
            unmet_needs.erase(item);
        }
        
        remaining_pharmacies.erase(remaining_pharmacies.begin() + best_idx);
    }
    
    return selected;
}
