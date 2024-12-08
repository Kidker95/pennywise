class ChartUtil {
    public getDoughnutChartSettings(labels: string[], userData: number[], partnerData: number[]) {
        const backgroundColors = [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
            "#FF9F40", "#C9CBFF", "#FF6B6B", "#4D5360", "#5AD3D1", 
            "#A3E1D4", "#FDB45C", "#949FB1", "#F7464A", "#00A86B"
        ];

        const userColors = backgroundColors.slice(0, labels.length); // Colors for the main user dataset
        const partnerColors = userColors.map(color => this.adjustBrightness(color, -20)); // Darker colors for the partner dataset

        return {
            labels: labels,
            datasets: [
                this.getDoughnutChartDataset(userData, "Main User Expenses", userColors),
                this.getDoughnutChartDataset(partnerData, "Partner Expenses", partnerColors)
            ],
            options: {
                cutout: '30%', // Smaller hole in the center
            },
        };
    }

    // New method to generate a dataset for each user
    public getDoughnutChartDataset(data: number[], label: string, colors: string[]) {
        return {
            label: label,
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors.map(color => this.adjustBrightness(color, 20)),
            hoverOffset: 0.1,
            borderRadius: 15, // Rounded corners
        };
    }

    
    private adjustBrightness(color: string, percent: number) {
        const num = parseInt(color.slice(1), 16),
              amt = Math.round(2.55 * percent),
              R = (num >> 16) + amt,
              G = (num >> 8 & 0x00FF) + amt,
              B = (num & 0x0000FF) + amt;
        return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1).toUpperCase()}`;
    }
}

export const chartUtil = new ChartUtil();
