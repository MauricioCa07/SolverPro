#!/bin/bash

declare -A translations=(
    ["bisection"]="Bisection"
    ["falserule"]="FalseRule"
    ["FixedPoint"]="FixedPoint"
    ["MultipleRoots"]="MultipleRoots"
    ["Newton"]="Newton"
    ["secant"]="Secant"
    ["Crout"]="Crout"
    ["GaussianPartialPivoting"]="GaussianPartialPivoting"
    ["GaussianTotalPivoting"]="GaussianTotalPivoting"
    ["LUparcial"]="LUPartial"
    ["cholesky"]="Cholesky"
    ["lu_sin_pivoteo"]="LUSinPivoteo"
    ["Gauss_Seidel"]="GaussSeidel"
    ["SOR"]="SOR"
    ["jacobi"]="Jacobi"
    ["Lagrange"]="Lagrange"
    ["newton_diferencias_divididas"]="NewtonDividedDifferences"
    ["simpson"]="Simpson"
    ["Euler"]="Euler"
    ["search"]="Search"
)

# Recorrer todos los archivos y carpetas
find ./ -type f | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file")
    
    # Reemplazar nombres según la traducción
    for key in "${!translations[@]}"; do
        if [[ "$base" == *"$key"* ]]; then
            new_name="${base//$key/${translations[$key]}}"
            # Convertir a formato "Asi_Se_Nombra_Una_Variable"
            formatted_name=$(echo "$new_name" | sed -E 's/_([a-z])/\U\1/g; s/^([a-z])/\U\1/; s/([a-z])([A-Z])/\1_\2/g')
            mv "$dir/$base" "$dir/$formatted_name"
            echo "Renamed $dir/$base to $dir/$formatted_name"
        fi
    done
done
