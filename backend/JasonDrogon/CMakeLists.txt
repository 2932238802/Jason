# 这个最先
cmake_minimum_required(VERSION 3.20)

# 这里设置 vcpkg 路径
# 注意本地环境 其实
if(NOT DEFINED CMAKE_TOOLCHAIN_FILE)
    if(DEFINED ENV{VCPKG_ROOT})
        set(CMAKE_TOOLCHAIN_FILE
            "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
            CACHE FILEPATH "Vcpkg toolchain file"
        )
    else()
        set(CMAKE_TOOLCHAIN_FILE
            "$ENV{HOME}/third/vcpkg/scripts/buildsystems/vcpkg.cmake"
            CACHE FILEPATH "Vcpkg toolchain file"
        )
    endif()
endif()
if(NOT DEFINED VCPKG_TARGET_TRIPLET)
    set(VCPKG_TARGET_TRIPLET
        "x64-linux"
        CACHE STRING "Vcpkg target triplet"
    )
endif()

# 这个要在 设置vcpkg之后
project(JasonDrogon LANGUAGES CXX)





set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)






find_package(Drogon CONFIG REQUIRED)
file(GLOB_RECURSE PROJECT_SOURCES CONFIGURE_DEPENDS
    "controllers/*.cc"
    "filters/*.cc"
    "plugins/*.cc"
    "models/*.cc"
    "service/*.cc"
)
add_executable(${PROJECT_NAME}
    main.cc
    ${PROJECT_SOURCES}
)







target_link_libraries(${PROJECT_NAME}
    PRIVATE
        Drogon::Drogon
)

target_include_directories(${PROJECT_NAME}
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}
        ${CMAKE_CURRENT_SOURCE_DIR}/models
        ${CMAKE_CURRENT_SOURCE_DIR}/controllers
        ${CMAKE_CURRENT_SOURCE_DIR}/service
)

if(EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/views")
    drogon_create_views(${PROJECT_NAME}
        ${CMAKE_CURRENT_SOURCE_DIR}/views
        ${CMAKE_CURRENT_BINARY_DIR}
    )
endif()

if(EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/test/CMakeLists.txt")
    enable_testing()
    add_subdirectory(test)
endif()
