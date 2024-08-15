module.exports = (sequelize, DataTypes) => {
    const MeasurementChart = sequelize.define('MeasurementChart', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      sizes: {
        type: DataTypes.JSON,
      },
      sample_size_file: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    }, {
        tableName: 'MeasurementCharts',
        timestamps: false,
    });

    MeasurementChart.associate = function(models) {
      MeasurementChart.hasMany(models.Product, { foreignKey: 'measurement_chart_id' });
      MeasurementChart.hasMany(models.PurchaseOrder, { foreignKey: 'measurement_chart_id' });
    };
  
    return MeasurementChart;
  };  