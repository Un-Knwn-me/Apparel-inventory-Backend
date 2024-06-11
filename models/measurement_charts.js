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
    }, {
        tableName: 'MeasurementCharts',
        timestamps: false,
    });
  
    return MeasurementChart;
  };  