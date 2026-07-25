#include <iostream>
#include <vector>
#include <string>
#include "Optimizer.h"

using namespace std;

// Mock input parsing and output formatting
int main() {
    // In a real scenario, we'd parse JSON from stdin using a library like nlohmann/json.
    // For this scaffold, we'll hardcode a test case to verify compilation and logic.
    
    vector<string> required = {"Paracetamol", "Amoxicillin", "Vitamin C"};
    
    vector<Pharmacy> pharmacies = {
        {1, "City Health", {"Paracetamol"}, 1.0},
        {2, "MediCare Plus", {"Amoxicillin", "Vitamin C"}, 1.2},
        {3, "SuperPharma", {"Paracetamol", "Amoxicillin"}, 1.1}
    };
    
    Optimizer opt;
    vector<Pharmacy> result = opt.computeOptimalSet(required, pharmacies);
    
    // Output JSON string (mocked format)
    cout << "{" << endl;
    cout << "  \"status\": \"SUCCESS\"," << endl;
    cout << "  \"selected_pharmacies\": [" << endl;
    for (size_t i = 0; i < result.size(); ++i) {
        cout << "    {\"id\": " << result[i].id << ", \"name\": \"" << result[i].name << "\"}";
        if (i < result.size() - 1) cout << ",";
        cout << endl;
    }
    cout << "  ]" << endl;
    cout << "}" << endl;
    
    return 0;
}
